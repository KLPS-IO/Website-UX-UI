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

/* ./subviews/privacy/privacy.twig */
class __TwigTemplate_45c531de67f202a42cd37d6fa7039b15 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'anonymous' => [$this, 'block_anonymous'],
            'datasecurity' => [$this, 'block_datasecurity'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 18
        yield "
<!-- Privacy message -->

<div class=\"";
        // line 21
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 21), "privacycontainer", [], "any", false, false, true, 21), 21, $this->source);
        yield " row\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 21), "privacycontainer", [], "any", false, false, true, 21), 21, $this->source);
        yield ">
    <div class=\"col-12 col-centered ";
        // line 22
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 22), "privacycol", [], "any", false, false, true, 22), 22, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 22), "privacycol", [], "any", false, false, true, 22), 22, $this->source);
        yield ">
        ";
        // line 23
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 23), "hideprivacyinfo", [], "any", false, false, true, 23) == "off")) {
            // line 24
            yield "            ";
            yield from $this->unwrap()->yieldBlock('anonymous', $context, $blocks);
            // line 41
            yield "        ";
        }
        // line 42
        yield "        ";
        yield from $this->unwrap()->yieldBlock('datasecurity', $context, $blocks);
        // line 51
        yield "    </div>
</div>
";
        return; yield '';
    }

    // line 24
    public function block_anonymous($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 25
        yield "                ";
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "anonymized", [], "any", false, false, true, 25) == "Y")) {
            // line 26
            yield "                    <div class=\"ls-privacy-block\">
                        <div class=\"";
            // line 27
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 27), "privacyhead", [], "any", false, false, true, 27), 27, $this->source);
            yield " text-uppercase\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 27), "privacyhead", [], "any", false, false, true, 27), 27, $this->source);
            yield ">
                            ";
            // line 28
            yield gT("This survey is anonymous.");
            yield "
                        </div>
                        <div>
                            <p class=\"";
            // line 31
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 31), "privacybody", [], "any", false, false, true, 31), 31, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 31), "privacybody", [], "any", false, false, true, 31), 31, $this->source);
            yield ">
                                ";
            // line 32
            yield gT("The record of your survey responses does not contain any identifying information about you, unless a specific survey question explicitly asked for it.");
            yield "
                            </p>
                            <p class=\"";
            // line 34
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 34), "privacybody", [], "any", false, false, true, 34), 34, $this->source);
            yield "\">
                                ";
            // line 35
            yield gT("If you used an identifying access code to access this survey, please rest assured that this code will not be stored together with your responses. It is managed in a separate database and will only be updated to indicate whether you did (or did not) complete this survey. There is no way of matching identification access codes with survey responses.");
            yield "
                            </p>
                        </div>
                    </div>
                ";
        }
        // line 40
        yield "            ";
        return; yield '';
    }

    // line 42
    public function block_datasecurity($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 43
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "format", [], "any", false, false, true, 43) != "A")) {
            // line 44
            yield "                ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "showsurveypolicynotice", [], "any", false, false, true, 44) == 1)) {
                // line 45
                yield "                    ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/privacy/privacy_text.twig");
                yield "
                ";
            } elseif ((CoreExtension::getAttribute($this->env, $this->source,             // line 46
($context["aSurveyInfo"] ?? null), "showsurveypolicynotice", [], "any", false, false, true, 46) == 2)) {
                // line 47
                yield "                    ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/privacy/privacy_modal.twig");
                yield "
                ";
            }
            // line 49
            yield "            ";
        }
        // line 50
        yield "        ";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/privacy/privacy.twig";
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
        return array (  153 => 50,  150 => 49,  144 => 47,  142 => 46,  137 => 45,  134 => 44,  131 => 43,  127 => 42,  122 => 40,  114 => 35,  110 => 34,  105 => 32,  99 => 31,  93 => 28,  87 => 27,  84 => 26,  81 => 25,  77 => 24,  70 => 51,  67 => 42,  64 => 41,  61 => 24,  59 => 23,  53 => 22,  47 => 21,  42 => 18,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/privacy/privacy.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/privacy/privacy.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 23, "block" => 24);
        static $filters = array();
        static $functions = array("gT" => 28, "include" => 45);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'block'],
                [],
                ['gT', 'include'],
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
