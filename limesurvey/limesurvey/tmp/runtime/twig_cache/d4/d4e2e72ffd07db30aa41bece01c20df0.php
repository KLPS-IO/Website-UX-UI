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

/* ./subviews/logincomponents/captcha.twig */
class __TwigTemplate_0c243a129262420b6d13ea219fd04a9a extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'formheading' => [$this, 'block_formheading'],
            'description' => [$this, 'block_description'],
            'formcontent' => [$this, 'block_formcontent'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<div class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 1), "maincoldivdiva", [], "any", false, false, true, 1), 1, $this->source);
        yield " form-heading\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 1), "maincoldivdiva", [], "any", false, false, true, 1), 1, $this->source);
        yield ">
    ";
        // line 2
        yield from $this->unwrap()->yieldBlock('formheading', $context, $blocks);
        // line 5
        yield "</div>
<div class=\"";
        // line 6
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 6), "maincoldivdivb", [], "any", false, false, true, 6), 6, $this->source);
        yield " \" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 6), "maincoldivdivb", [], "any", false, false, true, 6), 6, $this->source);
        yield ">

    ";
        // line 8
        yield from $this->unwrap()->yieldBlock('description', $context, $blocks);
        // line 11
        yield "
    ";
        // line 12
        if ( !empty(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 12), "aEnterErrors", [], "any", false, false, true, 12))) {
            // line 13
            yield "        <ul class='";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 13), "maincoldivdivbul", [], "any", false, false, true, 13), 13, $this->source);
            yield " alert alert-danger list-unstyled mt-3' ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 13), "maincoldivdivbul", [], "any", false, false, true, 13), 13, $this->source);
            yield ">
            ";
            // line 14
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 14), "aEnterErrors", [], "any", false, false, true, 14));
            foreach ($context['_seq'] as $context["key"] => $context["error"]) {
                // line 15
                yield "                <li>";
                yield $this->sandbox->ensureToStringAllowed($context["error"], 15, $this->source);
                yield "</li>
            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['error'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 17
            yield "        </ul>
    ";
        }
        // line 19
        yield "
    <div class=\"form-";
        // line 20
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 20), "sType", [], "any", false, false, true, 20), 20, $this->source);
        yield " ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 20), "maincoldivdivbdiv", [], "any", false, false, true, 20), 20, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 20), "maincoldivdivbdiv", [], "any", false, false, true, 20), 20, $this->source);
        yield " >
        ";
        // line 26
        yield "        ";
        // line 27
        $context["htmlOptions"] = ["id" => ("form-" . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,         // line 28
($context["aSurveyInfo"] ?? null), "aForm", [], "any", false, false, true, 28), "sType", [], "any", false, false, true, 28), 28, $this->source)), "name" => "limesurvey", "class" => "ls-form form form-horizontal"];
        // line 33
        yield "
        ";
        // line 35
        yield "        <!-- Start of the main Form-->
        ";
        // line 36
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,         // line 37
($context["C"] ?? null), "Html", [], "any", false, false, true, 37), "form", [CoreExtension::getAttribute($this->env, $this->source,         // line 38
($context["aSurveyInfo"] ?? null), "surveyUrl", [], "any", false, false, true, 38), "post",         // line 40
($context["htmlOptions"] ?? null)], "method", false, false, true, 37), 37, $this->source);
        // line 42
        yield "

        ";
        // line 44
        yield from $this->unwrap()->yieldBlock('formcontent', $context, $blocks);
        // line 77
        yield "        </form>
    </div>
</div>
";
        return; yield '';
    }

    // line 2
    public function block_formheading($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 3
        yield "        ";
        yield gT("Before you start, please prove you are human.");
        yield "
    ";
        return; yield '';
    }

    // line 8
    public function block_description($context, array $blocks = [])
    {
        $macros = $this->macros;
        yield "        
    ";
        return; yield '';
    }

    // line 44
    public function block_formcontent($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 45
        yield "
            <div class='";
        // line 46
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 46), "maincolformdivb", [], "any", false, false, true, 46), 46, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 46), "maincolformdivb", [], "any", false, false, true, 46), 46, $this->source);
        yield ">
                <!-- Doesn't seems aria capable -->
                <label class='";
        // line 48
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 48), "maincolformdivblabel", [], "any", false, false, true, 48), 48, $this->source);
        yield " control-label' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 48), "maincolformdivblabel", [], "any", false, false, true, 48), 48, $this->source);
        yield " >
                    ";
        // line 49
        yield gT("Please solve the following equation:");
        yield "<small class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 49), "maincolformdivblabelsmall", [], "any", false, false, true, 49), 49, $this->source);
        yield " superset asterisk ri-asterisk\"  ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 49), "maincolformdivblabelsmall", [], "any", false, false, true, 49), 49, $this->source);
        yield " ></small>
                    <span  class=\"";
        // line 50
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 50), "maincolformdivblabelspan", [], "any", false, false, true, 50), 50, $this->source);
        yield " visually-hidden asterisk\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 50), "maincolformdivblabelspan", [], "any", false, false, true, 50), 50, $this->source);
        yield ">
                        ( ";
        // line 51
        yield gT("Mandatory");
        yield " )
                    </span>
                </label>
                <div class=\"row\">
                    <div class='";
        // line 55
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 55), "maincolformdivbdivdivdiv", [], "any", false, false, true, 55), 55, $this->source);
        yield " captcha-container col-xl-3 col-lg-12 align-items-center' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 55), "maincolformdivbdivdivdiv", [], "any", false, false, true, 55), 55, $this->source);
        yield " >
                        ";
        // line 57
        yield "                        ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, LS_Twig_Extension::renderCaptcha(), "renderOut", [], "method", false, false, true, 57), 57, $this->source);
        yield "
                        <a href=\"#\" class=\"btn btn-outline-secondary\" id=\"reloadCaptcha\"
                           title=\"";
        // line 59
        yield gT("Reload captcha");
        yield "\" data-toggle=\"captcha\"><i
                                    class=\"ri-refresh-line\"></i></a>
                    </div>
                    <div class=\"";
        // line 62
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 62), "maincolformdivbdiv", [], "any", false, false, true, 62), 62, $this->source);
        yield " col-xl-9 col-lg-12 captcha-input align-self-center\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 62), "maincolformdivbdiv", [], "any", false, false, true, 62), 62, $this->source);
        yield ">
                        <input class='form-control ls-important-field ";
        // line 63
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 63), "maincolformdivbdivdivinput", [], "any", false, false, true, 63), 63, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 63), "maincolformdivbdivdivinput", [], "any", false, false, true, 63), 63, $this->source);
        yield " placeholder=\"";
        yield gT("Enter result here - numbers only");
        yield "\">
                    </div>
                </div>
            </div>

            <div class='";
        // line 68
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 68), "maincolformdivc", [], "any", false, false, true, 68), 68, $this->source);
        yield " ' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 68), "maincolformdivc", [], "any", false, false, true, 68), 68, $this->source);
        yield ">
                <div class='";
        // line 69
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 69), "maincolformdivcdiv", [], "any", false, false, true, 69), 69, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 69), "maincolformdivcdiv", [], "any", false, false, true, 69), 69, $this->source);
        yield ">
                    <button type=\"submit\"
                            class='";
        // line 71
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 71), "maincolformdivcdivbutton", [], "any", false, false, true, 71), 71, $this->source);
        yield " btn btn-primary' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 71), "maincolformdivcdivbutton", [], "any", false, false, true, 71), 71, $this->source);
        yield ">
                        ";
        // line 72
        yield gT("Continue");
        yield "
                    </button>
                </div>
            </div>
        ";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/logincomponents/captcha.twig";
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
        return array (  251 => 72,  245 => 71,  238 => 69,  232 => 68,  220 => 63,  214 => 62,  208 => 59,  202 => 57,  196 => 55,  189 => 51,  183 => 50,  175 => 49,  169 => 48,  162 => 46,  159 => 45,  155 => 44,  146 => 8,  138 => 3,  134 => 2,  126 => 77,  124 => 44,  120 => 42,  118 => 40,  117 => 38,  116 => 37,  115 => 36,  112 => 35,  109 => 33,  107 => 28,  106 => 27,  104 => 26,  96 => 20,  93 => 19,  89 => 17,  80 => 15,  76 => 14,  69 => 13,  67 => 12,  64 => 11,  62 => 8,  55 => 6,  52 => 5,  50 => 2,  43 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/logincomponents/captcha.twig", "/Users/emmamendez/Source/KLPS/Website-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/logincomponents/captcha.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("block" => 2, "if" => 12, "for" => 14, "set" => 27);
        static $filters = array();
        static $functions = array("empty" => 12, "gT" => 3, "renderCaptcha" => 57);

        try {
            $this->sandbox->checkSecurity(
                ['block', 'if', 'for', 'set'],
                [],
                ['empty', 'gT', 'renderCaptcha'],
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
