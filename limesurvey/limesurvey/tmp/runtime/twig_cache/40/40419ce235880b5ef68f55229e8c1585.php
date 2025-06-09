<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/navigation/question_index_menu.twig */
class __TwigTemplate_e82f827a4008b79786f63aaf2ac19bca extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        yield "
";
        // line 27
        yield "
";
        // line 28
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 28), "bShow", [], "any", false, false, true, 28) == true)) {
            // line 29
            yield "    ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "format", [], "any", false, false, true, 29) == "G")) {
                // line 30
                yield "        <!-- Question index, group, ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 30), "type", [], "any", false, false, true, 30), 30, $this->source);
                yield " -->
        <li class=\"dropdown nav-item ls-no-js-hidden index-menu-";
                // line 31
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 31), "type", [], "any", false, false, true, 31), 31, $this->source);
                yield "\">
            <a class=\"dropdown-toggle nav-link\" data-bs-toggle=\"dropdownCustom\" data-navtargetid=\"index-dropdown\" role=\"button\" aria-haspopup=\"true\"
               aria-expanded=\"false\" href=\"#\">
                ";
                // line 34
                yield gT("Question index");
                yield "
            </a>
            <ul id=\"index-dropdown\" class=\"dropdown-menu dropdown-menu-end\">
                ";
                // line 37
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/back.twig");
                yield "
                ";
                // line 39
                yield "                ";
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 39), "items", [], "any", false, false, true, 39));
                foreach ($context['_seq'] as $context["step"] => $context["indexItem"]) {
                    // line 40
                    yield "                    ";
                    $context["statusClass"] = "";
                    // line 41
                    yield "                    ";
                    if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 41), "index-item-unanswered", [], "any", true, true, true, 41) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 41), "index-item-unanswered", [], "any", false, false, true, 41) == true))) {
                        // line 42
                        yield "                        ";
                        $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 42, $this->source) . " index-warning");
                        // line 43
                        yield "                    ";
                    }
                    // line 44
                    yield "                    ";
                    if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 44), "index-item-error", [], "any", true, true, true, 44) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 44), "index-item-error", [], "any", false, false, true, 44) == true))) {
                        // line 45
                        yield "                        ";
                        $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 45, $this->source) . " index-danger");
                        // line 46
                        yield "                    ";
                    }
                    // line 47
                    yield "                    ";
                    if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 47), "index-item-current", [], "any", true, true, true, 47) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 47), "index-item-current", [], "any", false, false, true, 47) == true))) {
                        // line 48
                        yield "                        ";
                        $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 48, $this->source) . " disabled");
                        // line 49
                        yield "                    ";
                    }
                    // line 50
                    yield "                    <li class=\"list-group-item ";
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "coreClass", [], "any", false, false, true, 50), 50, $this->source);
                    yield "\">
                        <a href='";
                    // line 51
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "url", [], "any", false, false, true, 51), 51, $this->source);
                    yield "' data-limesurvey-submit='";
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "submit", [], "any", false, false, true, 51), 51, $this->source);
                    yield "'
                           class='dropdown-item  ";
                    // line 52
                    yield $this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 52, $this->source);
                    yield "'>
                            ";
                    // line 53
                    yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "text", [], "any", false, false, true, 53), 53, $this->source);
                    yield "
                        </a>
                    </li>
                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['step'], $context['indexItem'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 57
                yield "            </ul>
        </li>
    ";
            }
            // line 60
            yield "
    ";
            // line 62
            yield "    ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "format", [], "any", false, false, true, 62) == "S")) {
                // line 63
                yield "        <!-- Question index, question by question, ";
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 63), "type", [], "any", false, false, true, 63), 63, $this->source);
                yield " -->
        <li class=\"dropdown nav-item ls-no-js-hidden dropdown index-menu-";
                // line 64
                yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 64), "type", [], "any", false, false, true, 64), 64, $this->source);
                yield "\">
            <a class=\"dropdown-toggle nav-link\" data-bs-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\"
               aria-expanded=\"false\">
                ";
                // line 67
                yield gT("Question index");
                yield "
                <span class=\"caret\"></span>
            </a>
            <!-- TODO: Remove this when support is added -->
            <ul class=\"dropdown-menu dropdown-menu-end\">
                ";
                // line 72
                $context['_parent'] = $context;
                $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 72), "items", [], "any", false, false, true, 72));
                foreach ($context['_seq'] as $context["_key"] => $context["group"]) {
                    // line 73
                    yield "                    ";
                    // line 74
                    yield "                    <li>
                        <div class=\"dropdown-item-text\">
                            ";
                    // line 76
                    yield LS_Twig_Extension::flatEllipsizeText($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["group"], "text", [], "any", false, false, true, 76), 76, $this->source), true, 30, " &hellip; ", 0.6);
                    yield "
                        </div>
                    </li>
                            ";
                    // line 79
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["group"], "questions", [], "any", false, false, true, 79));
                    foreach ($context['_seq'] as $context["step"] => $context["indexItem"]) {
                        // line 80
                        yield "                                ";
                        $context["statusClass"] = "";
                        // line 81
                        yield "                                ";
                        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 81), "index-item-unanswered", [], "any", true, true, true, 81) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 81), "index-item-unanswered", [], "any", false, false, true, 81) == true))) {
                            // line 82
                            yield "                                    ";
                            $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 82, $this->source) . " bg-warning");
                            // line 83
                            yield "                                ";
                        }
                        // line 84
                        yield "                                ";
                        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 84), "index-item-error", [], "any", true, true, true, 84) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 84), "index-item-error", [], "any", false, false, true, 84) == true))) {
                            // line 85
                            yield "                                    ";
                            $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 85, $this->source) . " bg-danger");
                            // line 86
                            yield "                                ";
                        }
                        // line 87
                        yield "                                ";
                        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, true, true, 87), "index-item-current", [], "any", true, true, true, 87) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "stepStatus", [], "any", false, false, true, 87), "index-item-current", [], "any", false, false, true, 87) == true))) {
                            // line 88
                            yield "                                    ";
                            $context["statusClass"] = ($this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 88, $this->source) . " disabled");
                            // line 89
                            yield "                                ";
                        }
                        // line 90
                        yield "                                <li class=\"";
                        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "coreClass", [], "any", false, false, true, 90), 90, $this->source);
                        yield " ";
                        yield $this->sandbox->ensureToStringAllowed(($context["statusClass"] ?? null), 90, $this->source);
                        yield "\">
                                    <a href='";
                        // line 91
                        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "url", [], "any", false, false, true, 91), 91, $this->source);
                        yield "' data-limesurvey-submit='";
                        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "submit", [], "any", false, false, true, 91), 91, $this->source);
                        yield "'
                                       class='animate'>
                                        ";
                        // line 93
                        yield LS_Twig_Extension::flatEllipsizeText($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, $context["indexItem"], "text", [], "any", false, false, true, 93), 93, $this->source), true, 30, " &hellip; ", 0.6);
                        yield "
                                    </a>
                                </li>
                            ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['_iterated'], $context['step'], $context['indexItem'], $context['_parent'], $context['loop']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 97
                    yield "                ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['group'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 98
                yield "                ";
                if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 98), "type", [], "any", false, false, true, 98) == "full")) {
                    // line 99
                    yield "                    <li class=\"index-item\">
                        <div class=\"dropdown-item-text\">
                            ";
                    // line 101
                    yield gT("Question by question mode not yet supported.");
                    yield "
                        </div>
                    </li>
                ";
                }
                // line 105
                yield "            </ul>
        </li>
    ";
            }
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/navigation/question_index_menu.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  256 => 105,  249 => 101,  245 => 99,  242 => 98,  236 => 97,  226 => 93,  219 => 91,  212 => 90,  209 => 89,  206 => 88,  203 => 87,  200 => 86,  197 => 85,  194 => 84,  191 => 83,  188 => 82,  185 => 81,  182 => 80,  178 => 79,  172 => 76,  168 => 74,  166 => 73,  162 => 72,  154 => 67,  148 => 64,  143 => 63,  140 => 62,  137 => 60,  132 => 57,  122 => 53,  118 => 52,  112 => 51,  107 => 50,  104 => 49,  101 => 48,  98 => 47,  95 => 46,  92 => 45,  89 => 44,  86 => 43,  83 => 42,  80 => 41,  77 => 40,  72 => 39,  68 => 37,  62 => 34,  56 => 31,  51 => 30,  48 => 29,  46 => 28,  43 => 27,  40 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/navigation/question_index_menu.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/navigation/question_index_menu.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 28, "for" => 39, "set" => 40);
        static $filters = array();
        static $functions = array("gT" => 34, "include" => 37, "flatEllipsizeText" => 76);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for', 'set'],
                [],
                ['gT', 'include', 'flatEllipsizeText'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
